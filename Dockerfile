# Dockerfile
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости

# Копируем все остальные файлы
COPY . .

RUN npm install

RUN npx prisma generate

# Собираем приложение
RUN npm run build

RUN ls -la .next

# Запускаем приложение
EXPOSE 3000
CMD ["npm", "start"]