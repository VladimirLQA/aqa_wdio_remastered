pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '--user root --shm-size=2gb --no-sandbox --disable-gpu --disable-dev-shm-usage'
            reuseNode true
        }
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
                    npm run lint:check
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
                    npm run test:single
                '''
            }
        }
    }
}
