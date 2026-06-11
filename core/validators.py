import re
import bleach
from rest_framework import serializers


def sanitize_text(value):
    """Remove any HTML or malicious content from text fields."""
    if value:
        return bleach.clean(value, tags=[], strip=True).strip()
    return value


def validate_phone_number(value):
    """Validate Kenyan phone numbers."""
    pattern = r'^(?:\+254|254|0)[17]\d{8}$'
    if not re.match(pattern, value):
        raise serializers.ValidationError(
            'Enter a valid Kenyan phone number e.g. 0712345678'
        )
    return value


def validate_password_strength(value):
    """Enforce password requirements."""
    if len(value) < 6:
        raise serializers.ValidationError(
            'Password must be at least 6 characters.'
        )
    if not re.search(r'[A-Za-z]', value):
        raise serializers.ValidationError(
            'Password must contain at least one letter.'
        )
    if not re.search(r'\d', value):
        raise serializers.ValidationError(
            'Password must contain at least one number.'
        )
    return value


def validate_name(value):
    """Validate that name contains only letters and spaces."""
    if not re.match(r'^[A-Za-z\s\'-]+$', value):
        raise serializers.ValidationError(
            'Name can only contain letters, spaces, hyphens and apostrophes.'
        )
    return sanitize_text(value)