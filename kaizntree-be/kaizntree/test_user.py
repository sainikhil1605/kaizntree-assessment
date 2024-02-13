from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

class UserViewSetTestCase(APITestCase):

    def setUp(self):

        
        self.signup_url = reverse('user-list')
        self.token_url = reverse('token_obtain_pair')
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword'
        }

    def test_user_signup(self):

        response = self.client.post(self.signup_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('id' in response.data)
        self.assertTrue(get_user_model().objects.filter(username='testuser').exists())

    def test_user_login_and_token_generation(self):

        get_user_model().objects.create_user(**self.user_data)

        login_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }

        response = self.client.post(self.token_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)  # Check for access token
        self.assertTrue('refresh' in response.data)  # Check for refresh token
