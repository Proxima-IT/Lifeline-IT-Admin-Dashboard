npm run build
git add .
echo -ne "\n\t \033[32m>\033[0m Enter Commit Update: "; read -e message
git commit -m "$message"
git push