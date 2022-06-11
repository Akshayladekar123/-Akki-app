# Generated by Django 3.2.4 on 2021-08-26 09:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('matches', '0001_initial'),
        ('users', '0003_alter_user_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.CharField(max_length=250, verbose_name='Body')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Update Date')),
                ('match_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='matches.match')),
                ('receive_user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_recieve_message_user_id', to='users.user')),
                ('send_user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_send_message_user_id', to='users.user')),
            ],
            options={
                'db_table': 'chat',
            },
        ),
    ]
