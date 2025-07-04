FROM jenkins/jenkins:lts-jdk17

USER root

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean && \
    usermod -aG docker jenkins

USER jenkins