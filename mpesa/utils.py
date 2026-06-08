import requests
import base64
from datetime import datetime
from django.conf import settings


def get_mpesa_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    
    credentials = base64.b64encode(
        f"{consumer_key}:{consumer_secret}".encode()
    ).decode()
    
    url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    
    response = requests.get(
        url,
        headers={'Authorization': f'Basic {credentials}'}
    )
    
    return response.json().get('access_token')


def generate_password():
    shortcode = settings.MPESA_SHORTCODE
    passkey = settings.MPESA_PASSKEY
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    
    password = base64.b64encode(
        f"{shortcode}{passkey}{timestamp}".encode()
    ).decode()
    
    return password, timestamp


def initiate_stk_push(phone_number, amount, order_id):
    access_token = get_mpesa_access_token()
    password, timestamp = generate_password()
    
    # Format phone number to 254XXXXXXXXX
    if phone_number.startswith('0'):
        phone_number = '254' + phone_number[1:]
    elif phone_number.startswith('+'):
        phone_number = phone_number[1:]
    
    url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    
    payload = {
        'BusinessShortCode': settings.MPESA_SHORTCODE,
        'Password': password,
        'Timestamp': timestamp,
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': int(amount),
        'PartyA': phone_number,
        'PartyB': settings.MPESA_SHORTCODE,
        'PhoneNumber': phone_number,
        'CallBackURL': settings.MPESA_CALLBACK_URL,
        'AccountReference': f'LuxFashion#{order_id}',
        'TransactionDesc': f'Payment for Order #{order_id}',
    }
    
    response = requests.post(
        url,
        json=payload,
        headers={'Authorization': f'Bearer {access_token}'}
    )
    
    return response.json()