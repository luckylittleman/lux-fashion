import requests

login_response = requests.post('http://127.0.0.1:8000/api/accounts/login/', json={
    'identifier': 'hilaryomondi08@gmail.com',
    'password': 'Lucky004'
})

token = login_response.json()['access']

dashboard_response = requests.get(
    'http://127.0.0.1:8000/api/dashboard/overview/',
    headers={'Authorization': f'Bearer {token}'}
)

print(dashboard_response.json())