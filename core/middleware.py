from django.http import HttpResponseForbidden
from django.conf import settings


class AdminIPRestrictionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/lux-manage-2024/'):
            allowed_ips = getattr(settings, 'ADMIN_ALLOWED_IPS', [])
            if allowed_ips:
                ip = request.META.get('REMOTE_ADDR')
                if ip not in allowed_ips:
                    return HttpResponseForbidden('Access denied.')
        return self.get_response(request)