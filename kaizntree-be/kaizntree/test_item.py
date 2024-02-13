from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Item, Category, Tag 
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
class ItemViewSetTestCase(APITestCase):
    def setUp(self):
        # Create a test user and login
        self.user = get_user_model().objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.client.login(username='testuser', password='testpassword')
        self.token = RefreshToken.for_user(self.user)

        # Create test category and tag
        self.category = Category.objects.create(name="Electronics")
        self.tag = Tag.objects.create(name="Gadget")

        # Create test item
        self.item = Item.objects.create(
            sku="123456",
            name="Test Item",
            category=self.category,
            in_stock=70,
            available_stock=10
        )
        self.item.tags.add(self.tag)
    def test_get_items(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.get(reverse('item-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assuming only 1 item was added in setUp

    def test_get_single_item(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')

        response = self.client.get(reverse('item-detail', kwargs={'pk': self.item.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Item')
    def test_create_item(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')

        data = {
            "sku": "654321",
            "name": "New Item",
            "category": self.category.pk,
            "tags": [self.tag.pk],
            "in_stock": 70,
            "available_stock": 15
        }
        response = self.client.post(reverse('item-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 2)  # Including the item from setUp
    def test_delete_item(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        response = self.client.delete(reverse('item-detail', kwargs={'pk': self.item.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0)  # Assuming the only item was deleted


