📊 Student Task Monitoring Setup (DevOps Project)

A full-stack Student Task Management application integrated with DevOps monitoring tools including:

🐳 Docker (Containerization)
📈 Prometheus (Metrics collection)
📊 Grafana (Visualization dashboards)
📜 ELK Stack (Logging: Elasticsearch, Logstash, Kibana)
🚀 Project Overview

This project demonstrates a complete DevOps monitoring pipeline for a student task management system.

It helps to:

Track application performance
Monitor system health
Collect and visualize logs
Understand real-world DevOps observability practices
🏗️ Architecture
Frontend  → Backend API → Database
                ↓
        Prometheus (Metrics)
                ↓
           Grafana (Dashboards)

Logs → Logstash → Elasticsearch → Kibana
🧰 Tech Stack
Application
Node.js / Express (Backend)
MongoDB / MySQL (Database)
React / HTML (Frontend)
DevOps Tools
Docker & Docker Compose
Prometheus
Grafana
ELK Stack
📦 Project Structure
StudentTask-DevOps/
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── monitoring/
│   ├── prometheus.yml
│   ├── grafana/
│   └── elk/
│
├── docker-compose.yml
└── README.md
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/Sreelaya1619/student-task-monitoring-setup.git
cd student-task-monitoring-setup
2️⃣ Build and Run Containers
docker-compose up --build
3️⃣ Access Services
Service	URL
Frontend	http://localhost:3000
Backend API	http://localhost:5000
Prometheus	http://localhost:9090
Grafana	http://localhost:3001
Kibana	http://localhost:5601
📊 Monitoring Features
Prometheus
CPU usage tracking
Memory usage metrics
API response time monitoring
Grafana
Real-time dashboards
System performance graphs
Container-level monitoring
ELK Stack
Centralized log collection
Log filtering and search
Error tracking and debugging
🐳 Docker Support

All services are containerized using Docker.

Run everything with:

docker-compose up -d

Stop services:

docker-compose down
📌 Key Learnings
Docker container orchestration
Observability in distributed systems
Metrics vs Logs vs Traces
DevOps monitoring pipeline design
Real-world system debugging
👨‍💻 Author

Sreelaya1619

GitHub: https://github.com/Sreelaya1619

⭐ Future Improvements
Kubernetes deployment
CI/CD with GitHub Actions
Alerting with Prometheus Alertmanager
Security scanning integration
📜 License

This project is for educational and learning purposes.
