"""Views for authentication and user management."""

from rest_framework import generics, status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .serializers import (
    CustomTokenObtainPairSerializer,
    UserRegistrationSerializer,
    UserSerializer,
    UserUpdateSerializer,
    ChangePasswordSerializer,
)
from apps.core.utils import success_response, error_response, get_client_ip

User = get_user_model()


class LoginView(TokenObtainPairView):
    """
    POST /api/v1/auth/login/
    Authenticate user and return JWT tokens.
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Update last_login_ip if login successful
        if response.status_code == 200:
            email = request.data.get('email')
            try:
                user = User.objects.get(email=email)
                user.last_login_ip = get_client_ip(request)
                user.save(update_fields=['last_login_ip'])
            except User.DoesNotExist:
                pass

        return response


class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/auth/register/
    Register a new user account.
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return success_response(
            data={
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            },
            message='Registration successful.',
            status_code=status.HTTP_201_CREATED
        )


class LogoutView(views.APIView):
    """
    POST /api/v1/auth/logout/
    Blacklist the refresh token.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return error_response(
                    message='Refresh token is required.',
                    status_code=status.HTTP_400_BAD_REQUEST
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            return success_response(message='Successfully logged out.')
        except Exception:
            return error_response(
                message='Invalid token.',
                status_code=status.HTTP_400_BAD_REQUEST
            )


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    GET /api/v1/auth/profile/      - Get current user profile
    PATCH /api/v1/auth/profile/    - Update current user profile
    """
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserSerializer


class ChangePasswordView(views.APIView):
    """
    POST /api/v1/auth/change-password/
    Change the authenticated user's password.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)

        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()

        return success_response(message='Password changed successfully.')