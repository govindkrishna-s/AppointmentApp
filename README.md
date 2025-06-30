# 🗓️ Appointment Booking App

A full-stack appointment booking application built using Django REST Framework for the backend and React + Tailwind CSS for the frontend. Users can register, log in, book appointments, and manage them via a modern UI.

---

## 🚀 Features

- User Registration and Login (Token Auth)
- Create, View, Edit, Delete Appointments
- Check Available Time Slots by Date
- Responsive UI with React & Tailwind CSS
- Secure API with Token Authentication

---

## 🛠️ Tech Stack

### Backend (Django REST Framework)
- Django
- Django REST Framework
- Token Authentication
- MySQL

### Frontend (React)
- React
- Tailwind CSS
- Axios
- React Router DOM

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/backend.git
cd backend
```
### 2. Setup Backend (Django)

#### Create virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Install dependencies
```bash
pip install -r requirements.txt
```

#### Set up .env file (add SECRET_KEY, DB settings if needed)

#### Run migrations
```bash
python manage.py migrate
```

#### Create superuser
```bash
python manage.py createsuperuser
```

#### Run server
```bash
python manage.py runserver
```
### 3. Setup Frontend (React)
```bash
cd frontend
npm install
npm start
```
## 🔐 Authentication
Backend uses tokens for secure authentication.

On login, token is stored in localStorage and used in headers.


## 🌐 Live Demo
🌍 Frontend: [https://govindkrishnaappointment.netlify.app](https://govindkrishnaappointment.netlify.app/signup)

🔗 Backend: [https://govindkrishna.pythonanywhere.com/api/](https://govindkrishna.pythonanywhere.com/api/)

## 🙋‍♂️ Author
Made with ❤️ by Govind Krishna

