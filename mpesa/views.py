import json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MpesaTransaction
from .utils import initiate_stk_push
from orders.models import Order


class STKPushView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        order_id = request.data.get('order_id')

        if not phone_number or not order_id:
            return Response(
                {'error': 'Phone number and order ID are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        amount = order.total_price

        try:
            response = initiate_stk_push(phone_number, amount, order_id)

            if response.get('ResponseCode') == '0':
                MpesaTransaction.objects.create(
                    order=order,
                    merchant_request_id=response.get('MerchantRequestID'),
                    checkout_request_id=response.get('CheckoutRequestID'),
                    phone_number=phone_number,
                    amount=amount,
                    status='pending',
                )
                return Response({
                    'message': 'STK push sent successfully',
                    'checkout_request_id': response.get('CheckoutRequestID'),
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': response.get('errorMessage', 'Failed to initiate payment')},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MpesaCallbackView(APIView):
    def post(self, request):
        data = request.data
        
        try:
            stk_callback = data['Body']['stkCallback']
            checkout_request_id = stk_callback['CheckoutRequestID']
            result_code = stk_callback['ResultCode']
            result_description = stk_callback['ResultDesc']

            transaction = MpesaTransaction.objects.get(
                checkout_request_id=checkout_request_id
            )

            if result_code == 0:
                callback_metadata = stk_callback['CallbackMetadata']['Item']
                mpesa_receipt = next(
                    item['Value'] for item in callback_metadata
                    if item['Name'] == 'MpesaReceiptNumber'
                )
                transaction.status = 'completed'
                transaction.mpesa_receipt_number = mpesa_receipt
                transaction.order.status = 'processing'
                transaction.order.save()
            else:
                transaction.status = 'failed'

            transaction.result_code = str(result_code)
            transaction.result_description = result_description
            transaction.save()

            return Response({'ResultCode': 0, 'ResultDesc': 'Success'})

        except Exception as e:
            return Response({'ResultCode': 1, 'ResultDesc': str(e)})


class CheckTransactionStatusView(APIView):
    def get(self, request, checkout_request_id):
        try:
            transaction = MpesaTransaction.objects.get(
                checkout_request_id=checkout_request_id
            )
            return Response({
                'status': transaction.status,
                'mpesa_receipt_number': transaction.mpesa_receipt_number,
                'result_description': transaction.result_description,
            })
        except MpesaTransaction.DoesNotExist:
            return Response(
                {'error': 'Transaction not found'},
                status=status.HTTP_404_NOT_FOUND
            )