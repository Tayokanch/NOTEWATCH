pipeline {
    agent any

    environment {
        DB_USER           = credentials('DB_USER')
        DB_PASSWORD       = credentials('DB_PASSWORD')
        DB_NAME           = credentials('DB_NAME')
        DB_PORT           = credentials('DB_PORT')
        JWT_SECRET        = credentials('JWT_SECRET')
        INIT_ADMIN_EMAIL  = credentials('INIT_ADMIN_EMAIL')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare .env') {
            steps {
                sh '''
                # Create .env file for Docker Compose
                echo "DB_USER=${DB_USER}" > .env
                echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
                echo "DB_NAME=${DB_NAME}" >> .env
                echo "DB_PORT=${DB_PORT}" >> .env
                echo "JWT_SECRET=${JWT_SECRET}" >> .env
                echo "INIT_ADMIN_EMAIL=${INIT_ADMIN_EMAIL}" >> .env
                '''
            }
        }

        stage('Build API Images') {
            steps {
                sh '''
                docker compose build notewatchapi_v1 notewatchapi_v2 notewatchapi_v3
                '''
            }
        }

        stage('Deploy All Services') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                docker compose down
                docker compose up -d

                rm -f .env

                '''
            }
        }

    }
}
