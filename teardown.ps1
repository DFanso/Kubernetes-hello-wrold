# teardown.ps1

# Delete Nginx Deployment and Service
kubectl delete -f nginx-deployment.yaml
kubectl delete -f nginx-service.yaml

# Delete Web Server Deployment and Service
kubectl delete -f kube-hello-world-deployment.yaml
kubectl delete -f kube-hello-world-service.yaml

# Delete Redis Deployment and Service
kubectl delete -f redis-deployment.yaml
kubectl delete -f redis-service.yaml

# Delete MySQL Deployment and Service
kubectl delete -f mysql-deployment.yaml
kubectl delete -f mysql-service.yaml

Write-Output "All services deleted."
