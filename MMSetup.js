db.counters.insertMany([
   {
      _id: "manuscript",
      seq: 0
   },
   {
      _id: "issue",
      seq: -1
   },
   {
      _id: "person",
      seq: -1
   },
   {
      _id: "ri_code",
      seq: 0
   },
]);

function getNextSequence(name) {
   var ret = db.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}

db.issue.insertMany([
  { year: 2016,
    period: 4,
    volume: 1,
    title: 'mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis',
    status: 'Published' },
  { year: 2016,
    period: 4,
    volume: 2,
    title: 'justo morbi ut odio cras mi pede',
    status: 'Published' },
  { year: 2017,
    period: 1,
    volume: 1,
    title: 'ornare consequat lectus in est risus auctor',
    status: 'Scheduled' },
]);


db.manuscript.insertMany([
  { _id: getNextSequence('manuscript'),
    title: 'accumsan odio',
    description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Mauris viverra diam vitae quam. Suspendisse potenti.',
    ri_code: 92,
    status: 'Under Review',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-27 16:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'sapien cum sociis natoque penatibus et magnis dis',
    description: 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    ri_code: 31,
    status: 'Accepted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 22:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'a libero nam dui proin leo odio',
    description: 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    ri_code: 94,
    status: 'Rejected',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 20:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'integer ac leo',
    description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    ri_code: 65,
    status: 'Scheduled',
    issue_vol: 1,
    issue_year: 2017,
    num_pages: 24,
    start_page: 1,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 23:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'donec posuere metus vitae ipsum aliquam',
    description: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    ri_code: 82,
    status: 'Typesetting',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 20:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'metus arcu adipiscing',
    description: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    ri_code: 74,
    status: 'Published',
    issue_vol: 1,
    issue_year: 2016,
    num_pages: 12,
    start_page: 1,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 17:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'luctus et ultrices',
    description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    ri_code: 64,
    status: 'Published',
    issue_vol: 2,
    issue_year: 2016,
    num_pages: 22,
    start_page: 1,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 19:44:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'a feugiat et eros vestibulum',
    description: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    ri_code: 85,
    status: 'Under Review',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: '2017-04-27 10:24:18',
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'justo sollicitudin ut suscipit',
    description: 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    ri_code: 20,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'ut suscipit a feugiat et',
    description: 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    ri_code: 66,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'ut rhoncus aliquet',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    ri_code: 111,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'at vulputate vitae nisl aenean lectus',
    description: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    ri_code: 68,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'eget eros elementum pellentesque',
    description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    ri_code: 25,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'ut dolor morbi vel lectus in quam',
    description: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    ri_code: 86,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'ut ultrices vel augue vestibulum ante ipsum',
    description: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    ri_code: 67,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null },
  { _id: getNextSequence('manuscript'),
    title: 'vestibulum rutrum rutrum neque',
    description: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    ri_code: 15,
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: null,
    assigned_editor: 1,
    filename: null }
]);


db.manuscript_author.insertMany([
    {
      "manuscript_id": 1,
      "author_id": 2,
      "rank": 1
    },
    {
      "manuscript_id": 1,
      "author_id": 4,
      "rank": 2
    },
    {
      "manuscript_id": 1,
      "author_id": 23,
      "rank": 3
    },
    {
      "manuscript_id": 2,
      "author_id": 11,
      "rank": 1
    },
    {
      "manuscript_id": 2,
      "author_id": 23,
      "rank": 2
    },
    {
      "manuscript_id": 3,
      "author_id": 2,
      "rank": 4
    },
    {
      "manuscript_id": 3,
      "author_id": 5,
      "rank": 1
    },
    {
      "manuscript_id": 3,
      "author_id": 6,
      "rank": 2
    },
    {
      "manuscript_id": 3,
      "author_id": 10,
      "rank": 3
    },
    {
      "manuscript_id": 4,
      "author_id": 17,
      "rank": 1
    },
    {
      "manuscript_id": 4,
      "author_id": 18,
      "rank": 2
    },
    {
      "manuscript_id": 5,
      "author_id": 22,
      "rank": 1
    },
    {
      "manuscript_id": 6,
      "author_id": 27,
      "rank": 1
    },
    {
      "manuscript_id": 6,
      "author_id": 28,
      "rank": 2
    },
    {
      "manuscript_id": 6,
      "author_id": 29,
      "rank": 3
    },
    {
      "manuscript_id": 7,
      "author_id": 6,
      "rank": 1
    },
    {
      "manuscript_id": 8,
      "author_id": 2,
      "rank": 3
    },
    {
      "manuscript_id": 8,
      "author_id": 4,
      "rank": 1
    },
    {
      "manuscript_id": 8,
      "author_id": 6,
      "rank": 2
    },
    {
      "manuscript_id": 9,
      "author_id": 16,
      "rank": 1
    },
    {
      "manuscript_id": 9,
      "author_id": 17,
      "rank": 2
    },
    {
      "manuscript_id": 10,
      "author_id": 10,
      "rank": 1
    },
    {
      "manuscript_id": 11,
      "author_id": 18,
      "rank": 1
    },
    {
      "manuscript_id": 11,
      "author_id": 29,
      "rank": 2
    },
    {
      "manuscript_id": 12,
      "author_id": 23,
      "rank": 2
    },
    {
      "manuscript_id": 12,
      "author_id": 27,
      "rank": 1
    },
    {
      "manuscript_id": 13,
      "author_id": 2,
      "rank": 2
    },
    {
      "manuscript_id": 13,
      "author_id": 4,
      "rank": 4
    },
    {
      "manuscript_id": 13,
      "author_id": 10,
      "rank": 3
    },
    {
      "manuscript_id": 13,
      "author_id": 11,
      "rank": 1
    },
    {
      "manuscript_id": 13,
      "author_id": 29,
      "rank": 5
    },
    {
      "manuscript_id": 14,
      "author_id": 17,
      "rank": 3
    },
    {
      "manuscript_id": 14,
      "author_id": 18,
      "rank": 2
    },
    {
      "manuscript_id": 14,
      "author_id": 24,
      "rank": 1
    },
    {
      "manuscript_id": 15,
      "author_id": 5,
      "rank": 2
    },
    {
      "manuscript_id": 15,
      "author_id": 26,
      "rank": 1
    },
    {
      "manuscript_id": 16,
      "author_id": 5,
      "rank": 1
    },
    {
      "manuscript_id": 16,
      "author_id": 23,
      "rank": 3
    },
    {
      "manuscript_id": 16,
      "author_id": 25,
      "rank": 2
    }
]);


db.reviewer_interest.insertMany([
    {
      "reviewer_id": 3,
      "ri_code": 31
    },
    {
      "reviewer_id": 3,
      "ri_code": 92
    },
    {
      "reviewer_id": 3,
      "ri_code": 120
    },
    {
      "reviewer_id": 7,
      "ri_code": 65
    },
    {
      "reviewer_id": 7,
      "ri_code": 94
    },
    {
      "reviewer_id": 8,
      "ri_code": 22
    },
    {
      "reviewer_id": 8,
      "ri_code": 74
    },
    {
      "reviewer_id": 8,
      "ri_code": 82
    },
    {
      "reviewer_id": 9,
      "ri_code": 64
    },
    {
      "reviewer_id": 9,
      "ri_code": 85
    },
    {
      "reviewer_id": 9,
      "ri_code": 121
    },
    {
      "reviewer_id": 13,
      "ri_code": 31
    },
    {
      "reviewer_id": 13,
      "ri_code": 92
    },
    {
      "reviewer_id": 14,
      "ri_code": 1
    },
    {
      "reviewer_id": 14,
      "ri_code": 65
    },
    {
      "reviewer_id": 14,
      "ri_code": 94
    },
    {
      "reviewer_id": 15,
      "ri_code": 70
    },
    {
      "reviewer_id": 15,
      "ri_code": 74
    },
    {
      "reviewer_id": 15,
      "ri_code": 82
    },
    {
      "reviewer_id": 19,
      "ri_code": 64
    },
    {
      "reviewer_id": 19,
      "ri_code": 85
    },
    {
      "reviewer_id": 19,
      "ri_code": 102
    },
    {
      "reviewer_id": 20,
      "ri_code": 31
    },
    {
      "reviewer_id": 20,
      "ri_code": 92
    },
    {
      "reviewer_id": 20,
      "ri_code": 94
    },
    {
      "reviewer_id": 21,
      "ri_code": 65
    },
    {
      "reviewer_id": 21,
      "ri_code": 82
    },
    {
      "reviewer_id": 30,
      "ri_code": 64
    },
    {
      "reviewer_id": 30,
      "ri_code": 74
    },
    {
      "reviewer_id": 30,
      "ri_code": 85
    }
]);


db.manuscript_reviewer.insertMany([
    {
      "reviewer_id": 3,
      "manuscript_id": 1,
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": 3,
      "manuscript_id": 2,
      "result": "y",
      "clarity": 8,
      "method": 7,
      "contribution": 9,
      "appropriate": 10
    },
    {
      "reviewer_id": 7,
      "manuscript_id": 3,
      "result": "n",
      "clarity": 5,
      "method": 5,
      "contribution": 5,
      "appropriate": 6
    },
    {
      "reviewer_id": 7,
      "manuscript_id": 4,
      "result": "y",
      "clarity": 10,
      "method": 10,
      "contribution": 10,
      "appropriate": 10
    },
    {
      "reviewer_id": 8,
      "manuscript_id": 5,
      "result": "y",
      "clarity": 8,
      "method": 8,
      "contribution": 8,
      "appropriate": 8
    },
    {
      "reviewer_id": 8,
      "manuscript_id": 6,
      "result": "y",
      "clarity": 9,
      "method": 9,
      "contribution": 9,
      "appropriate": 9
    },
    {
      "reviewer_id": 9,
      "manuscript_id": 7,
      "result": "y",
      "clarity": 10,
      "method": 10,
      "contribution": 10,
      "appropriate": 10
    },
    {
      "reviewer_id": 9,
      "manuscript_id": 8,
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": 13,
      "manuscript_id": 1,
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": 13,
      "manuscript_id": 2,
      "result": "y",
      "clarity": 10,
      "method": 10,
      "contribution": 9,
      "appropriate": 10
    },
    {
      "reviewer_id": 14,
      "manuscript_id": 3,
      "result": "n",
      "clarity": 2,
      "method": 4,
      "contribution": 6,
      "appropriate": 8
    },
    {
      "reviewer_id": 14,
      "manuscript_id": 4,
      "result": "y",
      "clarity": 9,
      "method": 9,
      "contribution": 10,
      "appropriate": 10
    },
    {
      "reviewer_id": 15,
      "manuscript_id": 5,
      "result": "y",
      "clarity": 9,
      "method": 9,
      "contribution": 9,
      "appropriate": 9
    },
    {
      "reviewer_id": 15,
      "manuscript_id": 6,
      "result": "y",
      "clarity": 7,
      "method": 8,
      "contribution": 10,
      "appropriate": 10
    },
    {
      "reviewer_id": 19,
      "manuscript_id": 7,
      "result": "y",
      "clarity": 10,
      "method": 10,
      "contribution": 10,
      "appropriate": 10
    },
    {
      "reviewer_id": 19,
      "manuscript_id": 8,
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": 20,
      "manuscript_id": 1,
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": 20,
      "manuscript_id": 2,
      "result": "y",
      "clarity": 9,
      "method": 9,
      "contribution": 9,
      "appropriate": 9
    },
    {
      "reviewer_id": 20,
      "manuscript_id": 3,
      "result": "n",
      "clarity": 1,
      "method": 1,
      "contribution": 2,
      "appropriate": 3
    },
    {
      "reviewer_id": 21,
      "manuscript_id": 4,
      "result": "y",
      "clarity": 8,
      "method": 10,
      "contribution": 8,
      "appropriate": 9
    },
    {
      "reviewer_id": 21,
      "manuscript_id": 5,
      "result": "y",
      "clarity": 8,
      "method": 10,
      "contribution": 9,
      "appropriate": 7
    },
    {
      "reviewer_id": 30,
      "manuscript_id": 6,
      "result": "y",
      "clarity": 10,
      "method": 7,
      "contribution": 7,
      "appropriate": 10
    },
    {
      "reviewer_id": 30,
      "manuscript_id": 7,
      "result": "y",
      "clarity": 9,
      "method": 9,
      "contribution": 9,
      "appropriate": 9
    },
    {
      "reviewer_id": 30,
      "manuscript_id": 8,
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    }
]);


db.person.insertMany([
    {
      _id: getNextSequence('person'),
      "first_name": "Debanjum",
      "last_name": "Solanky",
      "type": 2,
      "email": "dibz@dibbymail.dib",
      "affiliation": "Dibby Dabby Doo",
      "mailing_address": "69 Dub Lane"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Tabby",
      "last_name": "Zannetti",
      "type": 1,
      "email": "tzannetti0@mozilla.org",
      "affiliation": "Ecole Nationale de la Statistique et de l\\'Administration Economique",
      "mailing_address": "6 Moose Court"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Howard",
      "last_name": "Tappor",
      "type": 2,
      "email": "htappor1@answers.com",
      "affiliation": "William Tyndale College",
      "mailing_address": "9 Summer Ridge Pass"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Euell",
      "last_name": "Aleshintsev",
      "type": 3,
      "email": "ealeshintsev2@slashdot.org",
      "affiliation": "Central Academy of Fine Art",
      "mailing_address": "2254 2nd Plaza"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Eben",
      "last_name": "Rolfe",
      "type": 2,
      "email": "erolfe3@pbs.org",
      "affiliation": "Universidad de Carabobo",
      "mailing_address": "2 Vidon Point"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Flem",
      "last_name": "Thompson",
      "type": 2,
      "email": "fthompson4@squarespace.com",
      "affiliation": "Escuela Superiore de Administración Pública",
      "mailing_address": "95879 Graceland Point"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Billie",
      "last_name": "Nieass",
      "type": 2,
      "email": "bnieass5@spiegel.de",
      "affiliation": "University of Kota",
      "mailing_address": "63703 Amoth Terrace"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Marylee",
      "last_name": "MacClure",
      "type": 3,
      "email": "mmacclure6@simplemachines.org",
      "affiliation": "Central Methodist College",
      "mailing_address": "2 Golf Plaza"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Michelina",
      "last_name": "Cousans",
      "type": 3,
      "email": "mcousans7@yale.edu",
      "affiliation": "2nd Military Medical University",
      "mailing_address": "258 Schurz Trail"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Ambros",
      "last_name": "Seeler",
      "type": 3,
      "email": "aseeler8@bbc.co.uk",
      "affiliation": "Indus Institute of Higher Education",
      "mailing_address": "4992 Prentice Terrace"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Cameron",
      "last_name": "Gladdish",
      "type": 2,
      "email": "cgladdish9@webeden.co.uk",
      "affiliation": "Federal University of Petroleum Resources",
      "mailing_address": "0 Ohio Plaza"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Jermain",
      "last_name": "Barnbrook",
      "type": 2,
      "email": "jbarnbrooka@unesco.org",
      "affiliation": "Carroll College Helena",
      "mailing_address": "2 Mosinee Park"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Bucky",
      "last_name": "Dummett",
      "type": 2,
      "email": "bdummettb@over-blog.com",
      "affiliation": "Université de Lubumbashi",
      "mailing_address": "471 Hallows Pass"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Fernando",
      "last_name": "Viste",
      "type": 3,
      "email": "fvistec@goo.gl",
      "affiliation": "Universitas Wisnuwardhana",
      "mailing_address": "680 Hoepker Circle"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Daffy",
      "last_name": "Kidston",
      "type": 3,
      "email": "dkidstond@weibo.com",
      "affiliation": "Kent State University - Stark",
      "mailing_address": "2 Johnson Road"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Dame",
      "last_name": "Yurenev",
      "type": 3,
      "email": "dyureneve@surveymonkey.com",
      "affiliation": "Northern Illinois University",
      "mailing_address": "99 Brentwood Alley"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Burg",
      "last_name": "Blaine",
      "type": 2,
      "email": "bblainef@hc360.com",
      "affiliation": "Metropolitan State University",
      "mailing_address": "841 Prairie Rose Parkway"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Willy",
      "last_name": "Vizor",
      "type": 2,
      "email": "wvizorg@wikispaces.com",
      "affiliation": "Universitas Negeri Surabaya",
      "mailing_address": "7 Mockingbird Road"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Amalea",
      "last_name": "Lempenny",
      "type": 2,
      "email": "alempennyh@devhub.com",
      "affiliation": "Sogang University",
      "mailing_address": "262 Moulton Crossing"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Gerty",
      "last_name": "Brittian",
      "type": 3,
      "email": "gbrittiani@indiegogo.com",
      "affiliation": "Tamil Nadu Dr. Ambedkar Law University",
      "mailing_address": "2378 Sunbrook Junction"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Lesya",
      "last_name": "Pietasch",
      "type": 3,
      "email": "lpietaschj@google.com.br",
      "affiliation": "Universidad Regiomontana",
      "mailing_address": "48 Westerfield Way"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Bealle",
      "last_name": "Schuster",
      "type": 3,
      "email": "bschusterk@discovery.com",
      "affiliation": "Jordan Academy of Music / Higher Institute of Music",
      "mailing_address": "2329 Elgar Junction"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Aloysius",
      "last_name": "Monckman",
      "type": 2,
      "email": "amonckmanl@netvibes.com",
      "affiliation": "Université de Toamasina",
      "mailing_address": "401 Moland Court"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Max",
      "last_name": "Massei",
      "type": 2,
      "email": "mmasseim@chronoengine.com",
      "affiliation": "Europäische Fachhochschule",
      "mailing_address": "41 Anzinger Terrace"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Jerrold",
      "last_name": "Gibbs",
      "type": 2,
      "email": "jgibbsn@biblegateway.com",
      "affiliation": "Universidad Privada San Pedro",
      "mailing_address": "774 West Point"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Lucien",
      "last_name": "Sudy",
      "type": 2,
      "email": "lsudyo@cocolog-nifty.com",
      "affiliation": "Midland Lutheran College",
      "mailing_address": "10 Bellgrove Alley"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Bette-ann",
      "last_name": "de Keep",
      "type": 2,
      "email": "bdekeepp@globo.com",
      "affiliation": "Debre Markos University",
      "mailing_address": "133 Elmside Crossing"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Valida",
      "last_name": "Balbeck",
      "type": 2,
      "email": "vbalbeckq@sun.com",
      "affiliation": "Ecole Supérieure de Physique et de Chimie Industrielles",
      "mailing_address": "032 Barby Drive"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Aili",
      "last_name": "Slimon",
      "type": 2,
      "email": "aslimonr@facebook.com",
      "affiliation": "Institut National des Sciences Appliquées de Lyon",
      "mailing_address": "367 Bashford Court"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Packston",
      "last_name": "Hartland",
      "type": 2,
      "email": "phartlands@aboutads.info",
      "affiliation": "Universidad Autónoma Metropolitana - Iztapalapa",
      "mailing_address": "686 Lake View Avenue"
    },
    {
      _id: getNextSequence('person'),
      "first_name": "Sholom",
      "last_name": "Overshott",
      "type": 3,
      "email": "sovershottt@arizona.edu",
      "affiliation": "Turku School of Economics and Business Administration",
      "mailing_address": "922 Fieldstone Center"
    }
]);

db.ri_code.insertMany([
    {
      _id: getNextSequence('ri_code'),
      "interest": "Agricultural engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Biochemical engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Biomechanical engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Ergonomics"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Food engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Bioprocess engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Genetic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Human genetic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Metabolic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Molecular engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Neural engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Protein engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Rehabilitation engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Tissue engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Aquatic and environmental engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Architectural engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Civionic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Construction engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Earthquake engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Earth systems engineering and management"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Ecological engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Environmental engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Geomatics engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Geotechnical engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Highway engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Hydraulic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Landscape engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Land development engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Pavement engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Railway systems engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "River engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Sanitary engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Sewage engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Structural engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Surveying"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Traffic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Transportation engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Urban engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Irrigation and agriculture engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Explosives engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Biomolecular engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Ceramics engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Broadcast engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Building engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Signal Processing"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Computer engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Power systems engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Control engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Telecommunications engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Electronic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Instrumentation engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Network engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Neuromorphic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Engineering Technology"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Integrated engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Value engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Cost engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Fire protection engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Domain engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Engineering economics"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Engineering management"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Engineering psychology"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Ergonomics"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Facilities Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Logistic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Model-driven engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Performance engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Process engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Product Family Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Quality engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Reliability engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Safety engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Security engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Support engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Systems engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Metallurgical Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Surface Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Biomaterials Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Crystal Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Amorphous Metals"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Metal Forming"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Ceramic Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Plastics Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Forensic Materials Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Composite Materials"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Casting"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Electronic Materials"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Nano materials"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Corrosion Engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Vitreous Materials"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Welding"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Acoustical engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Aerospace engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Audio engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Automotive engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Building services engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Earthquake engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Forensic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Marine engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Mechatronics"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Nanoengineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Naval architecture"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Sports engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Structural engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Vacuum engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Military engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Combat engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Offshore engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Optical engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Geophysical engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Mineral engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Mining engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Reservoir engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Climate engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Computer-aided engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Cryptographic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Information engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Knowledge engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Language engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Release engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Teletraffic engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Usability engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Web engineering"
    },
    {
      _id: getNextSequence('ri_code'),
      "interest": "Systems engineering"
    }
]);
