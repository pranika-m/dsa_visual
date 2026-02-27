from django.urls import path

from . import views

urlpatterns = [
    path(
        "concepts/<slug:slug>/visualization/",
        views.VisualizationConfigView.as_view(),
        name="visualization-config",
    ),
    path("execute/", views.CodeExecutionView.as_view(), name="code-execute"),
]
