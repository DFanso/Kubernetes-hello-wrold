1. **Install Express.js:**
   ```bash
   npm i
   ```


2. **Build the Docker image:**
   ```bash
   docker build -t kube-hello-world .
   ```

3. **Run the Docker container to test locally:**
   ```bash
   docker run -p 3000:3000 kube-hello-world
   ```

4. **Test the API by navigating to `http://localhost:3000` in your browser or using `curl`:**
   ```bash
   curl http://localhost:3000
   ```


5. **Open Docker Desktop.**
6. **Go to Settings.**
7. **Select the Kubernetes tab.**
8. **Check the "Enable Kubernetes" option.**
9. **Apply the changes and wait for Kubernetes to start.**


#### Kubernetes Configuration Files

1. **Create a `deployment.yaml` file with the following content:**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: node-hello-world-deployment
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: node-hello-world
     template:
       metadata:
         labels:
           app: node-hello-world
       spec:
         containers:
         - name: node-hello-world
           image: node-hello-world:latest
           ports:
           - containerPort: 3000
   ```

2. **Create a `service.yaml` file with the following content:**
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: node-hello-world-service
   spec:
     selector:
       app: node-hello-world
     ports:
       - protocol: TCP
         port: 80
         targetPort: 3000
     type: LoadBalancer
   ```

#### Apply the Configurations

1. **Apply the Kubernetes configurations:**
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

2. **Check the status of your deployment:**
   ```bash
   kubectl get deployments
   kubectl get services
   ```

### Step 6: Access Your Node.js API

1. **Get the URL for your service:**
   ```bash
   kubectl get service kube-hello-world-service
   ```

   The external IP might not be immediately available. If using Docker Desktop, you might need to use `localhost` with the port provided by the service.

2. **Port-forward to access the service locally:**
   ```bash
   kubectl port-forward svc/kube-hello-world-service 8080:80
   ```

   Now you can access your service at `http://localhost:8080`.
