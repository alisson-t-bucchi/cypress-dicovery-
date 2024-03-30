describe('Cadastro', () => {

    it('Usuario deve ser um entregador', () => {
        cy.viewport(1440, 900); 
        cy.visit('https://buger-eats.vercel.app');
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas'); 

        //supervariavel para a massa de teste
        const entregador = {
            nome: 'Fernando Almeida',
            cpf: '304567230',
            email: 'papito-almeida@gmail.com', 
            whatsapp: '351912568899',

            endereco: {
                cep: '01036000', 
                rua: 'Avenida São João', 
                numero: '140',
                complemento: 'Esquerdo',
                bairro: 'Centro', 
                cidade: 'São Paulo/SP'
            }, 
            metodo_entrega: 'Moto', 
            passaporte: 'Passaporte.jpg'
        }

        cy.get('input[name="name"]').type(entregador.nome); 
        cy.get('input[name="cpf"]').type(entregador.cpf);
        cy.get('input[name="email"]').type(entregador.email);
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp);
        cy.wait(3000); 

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep);
        cy.get('input[type=button][value="Buscar CEP"]').click();
        cy.wait(3000); 

        cy.get('input[name="address-number"]').type(entregador.endereco.numero);
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento);

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua);
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro);
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade);

        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.passaporte)
    })


})