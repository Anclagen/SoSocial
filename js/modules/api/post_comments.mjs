export class newPost {
  body = {
      "title": "",
      "body": "",
      "media": "",
      "tags": []
  }

  constructor(title, body, media = "", tags = ""){
    this.body.title = title
    this.body.body = body
    this.body.media = media
    this.body.tags = tags.split(' ');
    console.log(tags.split(' '))
  }

  returnBody(){
    return this.body
  }
}
