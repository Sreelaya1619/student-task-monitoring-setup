# StudentTask DevOps Environment

Welcome to the **StudentTask-DevOps** workspace. This repository configures and deploys a multi-tier application architecture complete with a centralized logging stack (ELK) and an enterprise monitoring system (Prometheus + Grafana) running entirely inside Docker.

---

## 🏗️ Architecture Overview

The containerized environment is split into three main layers:
1. **Core Applications:** The functional user interfaces and backend business logic endpoints.
2. **Centralized Logging (ELK Stack):** Automatically collects, formats, and stores logs for debugging.
3. **Metrics & Monitoring Stack:** Tracks performance metrics, resource consumption, and uptime.

---

## 🚦 Port Mapping & Local Access URLs

Once all containers are running, you can access individual services in your browser using the local endpoints below:

### 🌐 Core Application Tier
* **Frontend Application:** [http://localhost:3000](http://localhost:3000) (Maps port `3000` to internal container port `80`)
* **Backend API Service:** [http://localhost:3001](http://localhost:3001) (Maps port `3001` to internal container port `3001`)

### 📊 Log Management (ELK) Tier
* **Kibana (Log Visualization UI):** [http://localhost:5601](http://localhost:5601) (Maps host port `5601`)
* **Elasticsearch (Log Database Engine):** [http://localhost:9200](http://localhost:9200) (Maps host port `9200`)
* **Logstash (Log Processing Pipeline):** *Internal Route* on port `5044` (Receives ingested data from Filebeat agents)
* **Filebeat (Log Shipper Agent):** *Internal Service* (No public port exposed; runs quietly to harvest container log files)

### 📈 Metrics Monitoring Tier
* **Grafana (Metrics Dashboards):** [http://localhost:3002](http://localhost:3002) (Maps host port `3002` to internal container port `3000`)
* **Prometheus (Time-Series Metrics DB):** [http://localhost:9090](http://localhost:9090) (Maps host port `9090`)

---

## 🔄 Data, Log & Metrics Pipelines

### 1. Log Ingestion Pipeline (ELK)

```

[ Frontend / Backend Application ]
│
▼ (Generates console logs to standard out)
[ Filebeat ] (Harvests raw text files from Docker hosts)
│
▼ (Sends log events via JSON)
[ Logstash ] (Parses, filters, and structures the text fields)
│
▼
[ Elasticsearch ] (Stores indexes for high-speed search queries)
│
▼
[ Kibana ] (Queries Elasticsearch to display logs graphically)

```

### 2. Metrics Scraping Pipeline

```

[ Prometheus ] ───► (Scrapes performance targets at periodic intervals) ───► [ Containers ]
│
▼ (Pulls metrics database query entries)
[ Grafana ] (Populates customizable data visualization graphs)

```

---

## 🚀 Common DevOps Management Commands

Run these commands inside your terminal from the `~/StudentTask-DevOps` workspace:

### Verify Status of All Containers
To confirm everything is operating correctly:
```bash
docker ps

```

### Stop the Environment Safely

To halt the services without dropping database state or volumes:

```bash
docker compose down

```

### Start / Restart Environment in Background

To boot all services back up at once in detached mode:

```bash
docker compose up -d

```

### Live Stream Service Logs

To debug a specific running microservice environment natively (e.g., the backend API):

```bash
docker logs -f student-task-backend

```

```

```
