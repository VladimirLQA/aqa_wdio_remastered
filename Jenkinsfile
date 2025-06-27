pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '--shm-size=2gb'
            reuseNode true
        }
    }

    environment {
        ADMIN_USERNAME = credentials('ADMIN_USERNAME')
        ADMIN_PASSWORD = credentials('ADMIN_PASSWORD')
        SALES_PORTAL_URL = credentials('SALES_PORTAL_URL')
    }

    stages { 
        stage('Install dependencies') {
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Check code style') {
            steps {
                sh '''
                    echo "Running linting checks..."
                    npm run lint:check:staged
                '''
            }
            post {
                failure {
                    echo "Linting failed! Please fix the code style issues."
                }
                success {
                    echo "Linting passed successfully!"
                }
            }
        }

        stage('Run api tests') {
            steps {
                sh '''
                    npm run test:api:regression
                '''
            }
        }
    }
}
