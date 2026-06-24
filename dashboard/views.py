from django.shortcuts import render
from django.db.models import Sum, Count, Avg, F
from django.db.models.functions import TruncDate, TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from datetime import timedelta
from django.utils import timezone
from orders.models import Order, OrderItem
from store.models import Product, Category
from accounts.models import CustomUser
from mpesa.models import MpesaTransaction
import csv
import io
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from store.serializers import ProductSerializer


class DashboardOverviewView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        today = timezone.now().date()
        last_30_days = today - timedelta(days=30)

        total_revenue = Order.objects.filter(
            status__in=['processing', 'shipped', 'delivered']
        ).aggregate(total=Sum('total_price'))['total'] or 0

        total_orders = Order.objects.count()
        total_customers = CustomUser.objects.count()
        total_products = Product.objects.count()

        avg_order_value = Order.objects.aggregate(
            avg=Avg('total_price')
        )['avg'] or 0

        orders_by_status = Order.objects.values('status').annotate(
            count=Count('id')
        )

        recent_orders = Order.objects.filter(
            created_at__date__gte=last_30_days
        ).count()

        mpesa_success = MpesaTransaction.objects.filter(
            status='completed'
        ).count()
        mpesa_failed = MpesaTransaction.objects.filter(
            status='failed'
        ).count()
        mpesa_pending = MpesaTransaction.objects.filter(
            status='pending'
        ).count()

        return Response({
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'total_customers': total_customers,
            'total_products': total_products,
            'avg_order_value': round(avg_order_value, 2),
            'orders_by_status': list(orders_by_status),
            'recent_orders_30_days': recent_orders,
            'mpesa_stats': {
                'success': mpesa_success,
                'failed': mpesa_failed,
                'pending': mpesa_pending,
            },
        })


class RevenueChartView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        period = request.query_params.get('period', 'daily')

        if period == 'monthly':
            data = Order.objects.filter(
                status__in=['processing', 'shipped', 'delivered']
            ).annotate(
                period=TruncMonth('created_at')
            ).values('period').annotate(
                revenue=Sum('total_price'),
                orders=Count('id')
            ).order_by('period')
        else:
            last_30_days = timezone.now().date() - timedelta(days=30)
            data = Order.objects.filter(
                created_at__date__gte=last_30_days,
                status__in=['processing', 'shipped', 'delivered']
            ).annotate(
                period=TruncDate('created_at')
            ).values('period').annotate(
                revenue=Sum('total_price'),
                orders=Count('id')
            ).order_by('period')

        return Response(list(data))


class TopProductsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        top_products = OrderItem.objects.values(
            'product__id', 'product__name', 'product__category__name'
        ).annotate(
            total_sold=Sum('quantity'),
            total_revenue=Sum(F('quantity') * F('price'))
        ).order_by('-total_sold')[:10]

        return Response(list(top_products))


class SalesByCategoryView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        sales_by_category = OrderItem.objects.values(
            'product__category__name'
        ).annotate(
            total_sold=Sum('quantity'),
            total_revenue=Sum(F('quantity') * F('price'))
        ).order_by('-total_revenue')

        return Response(list(sales_by_category))


class LowStockView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        threshold = int(request.query_params.get('threshold', 5))
        low_stock_products = Product.objects.filter(
            stock__lte=threshold,
            is_available=True
        ).values('id', 'name', 'stock', 'category__name')

        return Response(list(low_stock_products))


class CustomersListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        customers = CustomUser.objects.annotate(
            order_count=Count('orders', distinct=True)
        ).values(
            'id', 'full_name', 'email', 'phone', 'created_at', 'order_count'
        ).order_by('-created_at')

        return Response(list(customers))
    
class BulkProductUploadView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response(
                {'error': 'No file uploaded'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not file.name.endswith('.csv'):
            return Response(
                {'error': 'File must be a CSV'},
                status=status.HTTP_400_BAD_REQUEST
            )

        decoded_file = file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)

        created_products = []
        errors = []

        for row_num, row in enumerate(reader, start=2):
            try:
                category, _ = Category.objects.get_or_create(
                    slug=row['category_slug'].strip().lower(),
                    defaults={'name': row['category_name'].strip()}
                )

                product = Product.objects.create(
                    category=category,
                    name=row['name'].strip(),
                    description=row.get('description', '').strip(),
                    price=row['price'].strip(),
                    stock=int(row.get('stock', 0)),
                    is_available=row.get('is_available', 'true').strip().lower() == 'true',
                )
                created_products.append(product.name)
            except Exception as e:
                errors.append(f'Row {row_num}: {str(e)}')

        return Response({
            'created_count': len(created_products),
            'created_products': created_products,
            'errors': errors,
        }, status=status.HTTP_201_CREATED)    
