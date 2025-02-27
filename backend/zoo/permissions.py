from rest_framework.permissions import BasePermission

class IsZookeeper(BasePermission):
    """Allows only zookeepers to modify data"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "zookeeper"

class IsVisitor(BasePermission):
    """Allows visitors to only read data"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "visitor"
