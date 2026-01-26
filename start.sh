cd 'C:\Users\student\Desktop\github\Olympiad'
git init
git add start.sh respa.html
git update-index --chmod=+x start.sh
git commit -m "Add start.sh to serve static site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
