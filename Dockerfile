FROM node:6 as build 

COPY ./ /frontend
WORKDIR /frontend

USER root

RUN npm install -g @angular/cli
RUN npm install
RUN ng build


FROM maartje/static-base:arm64-latest

COPY --from=build /frontend/dist /var/www/
