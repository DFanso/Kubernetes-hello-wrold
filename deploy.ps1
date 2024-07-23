# deploy.ps1

# Apply MySQL Deployment and Service
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml

# Apply Redis Deployment and Service
kubectl apply -f redis-deployment.yaml
kubectl apply -f redis-service.yaml

# Apply Web Server Deployment and Service
kubectl apply -f kube-hello-world-deployment.yaml
kubectl apply -f kube-hello-world-service.yaml

# Apply Nginx Deployment and Service
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml

Write-Output "All services deployed."
