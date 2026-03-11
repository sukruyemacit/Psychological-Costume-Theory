from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

df = pd.read_csv("data.csv")

def calculate_power_score(row):
    return (
        row["Height"] * 0.3 +
        row["Ornament"] * 0.2 +
        row["Color"] * 0.2 +
        row["Structure"] * 0.3
    )


df["PowerScore"] = df.apply(calculate_power_score, axis=1)

def generate_image_path(name):
    filename = name.lower().replace(" ", "_")
    return f"/static/images/{filename}.jpg"

df["Image"] = df["Name"].apply(generate_image_path)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():
    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
