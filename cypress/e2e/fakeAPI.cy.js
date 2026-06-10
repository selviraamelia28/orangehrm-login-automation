describe('API Automation Testing - 12 Requests (Platzi Fake API)', () => {
  const baseUrl = 'https://api.escuelajs.co/api/v1';
  let categoryId; // Variabel untuk menyimpan ID kategori yang dibuat dinamis

  // ==========================================
  // 1. CATEGORIES ENDPOINT (Sesuai Perintah Utama)
  // ==========================================

  it('TC01 - GET All Categories', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
    });
  });

  it('TC02 - GET Single Category Success', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/1`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name');
    });
  });

  it('TC03 - GET Single Category Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/20`, 
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.contain('Could not find any entity of type "Category" matching: {\n    "id": 20\n}');
    });
  });

  it('TC04 - POST Create Category', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories/`,
      body: {
        name: 'Electronics Gadget',
        image: 'https://placeimg.com/640/480/any'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq('QueryFailedError');
      categoryId = response.body.id;
    });
  });


  it('TC05 - PUT Update Category', () => {
    // Memastikan id ada, jika tidak ada pakai id default '1'
    const idToUpdate = categoryId || 1; 
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/categories/${idToUpdate}`,
      body: {
        name: 'Updated Gadget Name'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Updated Gadget Name');
    });
  });

  it('TC06 - DELETE Category', () => {
    const idToDelete = categoryId || 999;
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/categories/${idToDelete}`,
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 400]).to.include(response.status);

      if (response.status === 200) {
        expect(response.body).to.eq(true);
      } else {
        expect(response.body).to.have.property('message');
      }
    });
  });

  it('TC07 - GET Products by Category', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/1/products`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  // ==========================================
  // 2. PRODUCTS & USERS ENDPOINT (Pelengkap agar Genap 12 Request)
  // ==========================================

  it('TC08 - GET All Products', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products?limit=5&offset=0`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(5);
    });
  });

  it('TC09 - GET Single Product Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products/999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('TC10 - GET All Users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?limit=3`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('TC11 - POST Create User (Validation Error)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users/`,
      body: {
        name: 'John Doe'
        // Sengaja mengosongkan email & password agar memicu error
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.be.an('array'); // Berisi list error validasi
    });
  });

  it('TC12 - POST Check Email Availability', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users/is-available`,
      body: {
        email: 'john@mail.com'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('isAvailable'); // Menghasilkan true atau false
    });
  });

});