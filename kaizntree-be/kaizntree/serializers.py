from rest_framework import serializers
from .models import Item, Category, Tag,User
 
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id",'name']
class ItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Item
        fields = ["id",'sku', 'name', 'category',"category_name","tags", 'in_stock', 'available_stock','stock_status']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id",'name']



from rest_framework import serializers
from .models import User  # Make sure to import your custom User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Create a new user instance using the create_user method from the custom manager
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
