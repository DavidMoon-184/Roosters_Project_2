from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABSE_URI'] = 'sqlite:///posts.db'
db = SQLAlchemy(app)

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    title = db.Column(db.String(20), nullable=False)
    title = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return 'Blog post ' + str(self.id)

all_posts = [
    {
            'title': 'Post 1',
            'content': 'This is the content of post 1. Lalala.',
            'author': 'David'
    },
    {
            'title': 'Post 2',
            'content': 'This is the content of post 2. Lalala.'
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/posts')
def posts():
    return render_template('posts.html', posts=all_posts)

if __name__ == "__main__":
    app.run(debug=True)