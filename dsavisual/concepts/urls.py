from django.urls import path

from . import views

urlpatterns = [
    path("concepts/<slug:slug>/", views.ConceptDetailView.as_view(), name="concept-detail"),
]
