from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category

class CategoryViewSetTestCase(APITestCase):
    def setUp(self):
        # Create a test user and get a JWT token
        self.user = get_user_model().objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')
        
        # Create a test category
        self.category_name = "Electronics"
        self.category = Category.objects.create(name=self.category_name)

    def test_create_category(self):
        # Test creating a category
        data = {"name": "Gadgets"}
        response = self.client.post(reverse('category-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)  # Including the category from setUp

    def test_retrieve_category(self):
        # Test retrieving a category's details
        response = self.client.get(reverse('category-detail', kwargs={'pk': self.category.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.category_name)

    def test_update_category(self):
        # Test updating a category's name
        updated_name = "Home Appliances"
        data = {"name": updated_name}
        response = self.client.patch(reverse('category-detail', kwargs={'pk': self.category.pk}), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.category.refresh_from_db()
        self.assertEqual(self.category.name, updated_name)

    def test_delete_category(self):
        # Test deleting a category
        response = self.client.delete(reverse('category-detail', kwargs={'pk': self.category.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 0)
