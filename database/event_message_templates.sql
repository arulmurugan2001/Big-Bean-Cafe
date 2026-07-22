-- Big Bean Café Event Message Templates

CREATE TABLE IF NOT EXISTS event_message_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template_key VARCHAR(100) UNIQUE NOT NULL,
    template_name VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NULL,
    email_body TEXT NULL,
    whatsapp_body TEXT NULL,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO event_message_templates (template_key, template_name, subject, email_body, whatsapp_body, status) VALUES
(
    'booking_confirmation',
    'Booking Confirmation',
    'Your Big Bean Café Event Booking is Confirmed',
    '<p>Hi {{customer_name}},</p><p>Your booking for <strong>{{event_title}}</strong> is confirmed.</p><p>Booking ID: {{booking_id}}<br>Date: {{event_date}}<br>Time: {{event_time}}<br>Venue: {{venue}}<br>Tickets: {{quantity}}</p><p>Please show this email at check-in.</p><p>Thank you,<br>Big Bean Café</p>',
    'Hi {{customer_name}}, your booking for {{event_title}} is confirmed.\n\nBooking ID: {{booking_id}}\nDate: {{event_date}}\nTime: {{event_time}}\nVenue: {{venue}}\nTickets: {{quantity}}\n\nPlease show this message at check-in.\n\nThank you,\nBig Bean Café',
    'active'
),
(
    'booking_reminder',
    'Booking Reminder',
    'Reminder: Your Big Bean Café Event is Coming Up',
    '<p>Hi {{customer_name}},</p><p>This is a reminder that your booking for <strong>{{event_title}}</strong> is coming up.</p><p>Booking ID: {{booking_id}}<br>Date: {{event_date}}<br>Time: {{event_time}}<br>Venue: {{venue}}<br>Tickets: {{quantity}}</p><p>We look forward to seeing you!</p><p>Thank you,<br>Big Bean Café</p>',
    'Hi {{customer_name}}, reminder: your booking for {{event_title}} is coming up.\n\nBooking ID: {{booking_id}}\nDate: {{event_date}}\nTime: {{event_time}}\nVenue: {{venue}}\nTickets: {{quantity}}\n\nWe look forward to seeing you!\n\nThank you,\nBig Bean Café',
    'active'
),
(
    'checkin_success',
    'Check-in Success',
    'You are checked in - Big Bean Café Event',
    '<p>Hi {{customer_name}},</p><p>You are checked in for <strong>{{event_title}}</strong>. Enjoy your Big Bean Café event!</p><p>Booking ID: {{booking_id}}<br>Date: {{event_date}}<br>Time: {{event_time}}<br>Venue: {{venue}}<br>Tickets: {{quantity}}</p>',
    'Hi {{customer_name}}, you are checked in for {{event_title}}. Enjoy your Big Bean Café event!',
    'active'
),
(
    'booking_cancelled',
    'Booking Cancelled',
    'Your Big Bean Café Event Booking is Cancelled',
    '<p>Hi {{customer_name}},</p><p>Your booking for <strong>{{event_title}}</strong> has been cancelled.</p><p>Booking ID: {{booking_id}}<br>Date: {{event_date}}<br>Time: {{event_time}}<br>Venue: {{venue}}<br>Tickets: {{quantity}}</p><p>If you have any questions, please contact us.</p><p>Thank you,<br>Big Bean Café</p>',
    'Hi {{customer_name}}, your booking for {{event_title}} has been cancelled.\n\nBooking ID: {{booking_id}}\nDate: {{event_date}}\nTime: {{event_time}}\nVenue: {{venue}}\nTickets: {{quantity}}\n\nIf you have any questions, please contact us.\n\nThank you,\nBig Bean Café',
    'active'
)
ON DUPLICATE KEY UPDATE
    template_name = VALUES(template_name),
    subject = VALUES(subject),
    email_body = VALUES(email_body),
    whatsapp_body = VALUES(whatsapp_body),
    status = VALUES(status);
