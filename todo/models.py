from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=500, null=True)
    completed = models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.title