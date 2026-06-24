from django.urls import path
from . import views

urlpatterns = [
    path('overview/', views.DashboardOverviewView.as_view(), name='dashboard-overview'),
    path('revenue-chart/', views.RevenueChartView.as_view(), name='revenue-chart'),
    path('top-products/', views.TopProductsView.as_view(), name='top-products'),
    path('sales-by-category/', views.SalesByCategoryView.as_view(), name='sales-by-category'),
    path('low-stock/', views.LowStockView.as_view(), name='low-stock'),
    path('customers/', views.CustomersListView.as_view(), name='customers-list'),
    path('bulk-upload/', views.BulkProductUploadView.as_view(), name='bulk-upload'),
]