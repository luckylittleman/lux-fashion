from django.urls import path
from . import views

urlpatterns = [
    path('stkpush/', views.STKPushView.as_view(), name='stk-push'),
    path('callback/', views.MpesaCallbackView.as_view(), name='mpesa-callback'),
    path('status/<str:checkout_request_id>/', views.CheckTransactionStatusView.as_view(), name='transaction-status'),
]