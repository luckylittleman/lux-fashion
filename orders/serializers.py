from rest_framework import serializers
from .models import Order, OrderItem
from store.models import Product
from core.validators import sanitize_text, validate_phone_number


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'full_name', 'email', 'phone',
            'address', 'county', 'postal_code',
            'status', 'total_price', 'items', 'created_at'
        ]

    def validate_phone(self, value):
        if value:
            return validate_phone_number(value)
        return value

    def validate_full_name(self, value):
        return sanitize_text(value)

    def validate_address(self, value):
        return sanitize_text(value)

    def validate_county(self, value):
        return sanitize_text(value)

    def validate_total_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                'Total price must be greater than 0'
            )
        return value

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order