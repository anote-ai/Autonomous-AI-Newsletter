# Anote-AutonomousNewsletter

Medium Article: https://anote-ai.medium.com/case-study-autonomous-ai-newsletter-7a20a7ada73e

### To run the locally you should:

#### Clone this repo to your local machine

```
git clone https://github.com/nv78/Anote-AutonomousNewsletter.git
```

#### To run the Backend
```
cd back-end
pip3 install -r requirements.txt
export APP_ENV=local
flask run
```

change the default_referrer to localhost:3000, and initialize the development database with `python3 init_db_dev.py`

#### To run the Frontend
```
cd my-app
npm install
npm start
```
