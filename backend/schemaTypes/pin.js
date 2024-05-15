export default {
  name: 'pin',
  type: 'document',
  title: 'Pin',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'about',
      type: 'string',
      title: 'About',
    },
    {
      name: 'destination',
      type: 'url',
      title: 'Destination',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
    },
    {
      name: 'comments',
      type: 'array',
      title: 'Comments',
      of: [
        {
          type: 'comment',
        },
      ],
    },
    {
      name: 'postedBy',
      type: 'postedBy',
      title: 'PostedBy',
    },
    {
      name: 'save',
      type: 'array',
      title: 'Save',
      of: [
        {
          type: 'save',
        },
      ],
    },
    {
      name: 'userId',
      type: 'string',
      title: 'UserId',
    },
  ],
}
