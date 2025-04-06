const checkboxData = [
    {
      id: '1',
      label: 'Electronics',
      children: [
        {
          id: '1-1',
          label: 'Smartphones',
          children: [
            {
              id: '1-1-1',
              label: 'iPhone',
              children: [
                {
                  id: '1-1-1-1',
                  label: 'iPhone 14',
                  children: []
                },
                {
                  id: '1-1-1-2',
                  label: 'iPhone 13',
                  children: []
                }
              ]
            },
            {
              id: '1-1-2',
              label: 'Android',
              children: [
                {
                  id: '1-1-2-1',
                  label: 'Samsung',
                  children: []
                },
                {
                  id: '1-1-2-2',
                  label: 'Google Pixel',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: '1-2',
          label: 'Laptops',
          children: [
            {
              id: '1-2-1',
              label: 'Gaming',
              children: []
            },
            {
              id: '1-2-2',
              label: 'Business',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: '2',
      label: 'Clothing',
      children: [
        {
          id: '2-1',
          label: "Men's Wear",
          children: [
            {
              id: '2-1-1',
              label: 'Formal',
              children: []
            },
            {
              id: '2-1-2',
              label: 'Casual',
              children: []
            }
          ]
        },
        {
          id: '2-2',
          label: "Women's Wear",
          children: [
            {
              id: '2-2-1',
              label: 'Dresses',
              children: []
            },
            {
              id: '2-2-2',
              label: 'Accessories',
              children: []
            }
          ]
        }
      ]
    }
  ];
  
  export default checkboxData;