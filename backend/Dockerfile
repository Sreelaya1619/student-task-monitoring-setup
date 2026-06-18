FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Create logs directory
RUN mkdir -p /logs

EXPOSE 3001

CMD ["npm", "start"]