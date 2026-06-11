from rest_framework.throttling import AnonRateThrottle, UserRateThrottle


class LoginRateThrottle(AnonRateThrottle):
    scope = 'login'


class RegisterRateThrottle(AnonRateThrottle):
    scope = 'register'


class OrderRateThrottle(UserRateThrottle):
    scope = 'order'


class MpesaRateThrottle(UserRateThrottle):
    scope = 'mpesa'