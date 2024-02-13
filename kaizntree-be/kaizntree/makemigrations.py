from django.db import migrations, models

def boolean_to_float(apps, schema_editor):
    Item = apps.get_model('kaizntree', 'Item')  
    for item in Item.objects.all():
        item.temp_in_stock = float(item.in_stock)
        item.save()

class Migration(migrations.Migration):

    dependencies = [
        ('kaizntree', '0002_previous_migration'),  
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='temp_in_stock',
            field=models.FloatField(default=0), 
        ),
        migrations.RunPython(boolean_to_float),
        migrations.RemoveField(
            model_name='item',
            name='in_stock',
        ),
        migrations.RenameField(
            model_name='item',
            old_name='temp_in_stock',
            new_name='in_stock',
        ),
    ]
