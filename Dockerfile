# Use Node.js as base image
FROM node:alpine


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


ENV PORT=3000
ENV MONGODB_URI=mongodb+srv://imeusoro:x37knj0M9LTuucjR@mainstack-main.gocllxp.mongodb.net/mainstack
ENV JWT_SECRET=mainstack
ENV CLOUDINARY_CLOUD_NAME=dk35lvftm
ENV CLOUDINARY_API_KEY=316769377275616
ENV CLOUDINARY_API_SECRET=nXLWaIPtVHla8m3R907GZ22_2KM
ENV CLOUDINARY_FOLDER_PATH=mainstack/


EXPOSE 3000


CMD ["npm", "start"]
