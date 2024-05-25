import React from 'react';
import { mount } from 'cypress/react18';
import Tasklist from '../../src/components/Tasklist';

describe('delete task form', () => {
    beforeEach(() => {
        // Visit the page
        cy.visit('http://localhost:5173/login');
    
        // Log in using a tester account
        cy.get("#username").type('tester');
        cy.get("#password").type('1qaz2wsx');
        cy.get('[type="submit"]').click();
    });

    // TST_No_05_01
    it('should show the delete task modal', () => {
        // Make sure that there is a task that can be deleted
        // Create a test task with a valid title and description
        cy.get('[data-cy=title-input]').type('Delete Task Test');
        cy.get('[data-cy=description-input]').type('Delete Task Test');
        cy.get('[data-cy=add-button]').click();
        cy.get('[data-cy="task-list"]').contains('Delete Task Test').should('exist');
        cy.get('[data-cy="task-list"]').contains('Delete Task Test').should('exist');

        // Click 'Delete' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-red-400').click({ force: true });
        });

        // A delete task modal should be visible
        cy.get('.swal2-container').should('be.visible');

        // A warning icon must be displayed
        cy.get('.swal2-icon').should('be.visible');

        // A warning title must be displayed 
        cy.get('#swal2-title.swal2-title').should('be.visible');
        cy.get('#swal2-title.swal2-title').should('have.text', 'Are you sure?');

        // A warning message/text must be displayed
        cy.get('#swal2-html-container.swal2-html-container').should('be.visible');
        cy.get('#swal2-html-container.swal2-html-container').should('have.text', "You won't be able to revert this!");
        
        // A confirm button must be displayed
        cy.get('.swal2-confirm').should('be.visible');
        cy.get('.swal2-confirm').should('have.text', 'Yes, delete it!');

        // A cancel button must be displayed
        cy.get('.swal2-cancel').should('be.visible');
        cy.get('.swal2-cancel').should('have.text', 'Cancel');
    });

    // TST_No_05_02
    it('should cancel the deletion of a task when "Cancel" button is clicked', () => {
        // Click 'Delete' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-red-400').click({ force: true });
        });

        // Click 'Cancel' button
        cy.get('.swal2-cancel').click();

        // Delete Task modal must not be visible or user is back in the tasklist
        cy.get('#root').should('be.visible');
    });

    // TST_No_05_03
    it('should delete a task when the "Confirm" button is clicked', () => {
        // Click 'Delete' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-red-400').click({ force: true });
        });

        // Click confirm and delete task
        cy.get('.swal2-confirm').click();

        // A confirmation modal must be visible
        cy.get('.swal2-container').should('be.visible');
        
        // Click "OK" button to close the popup message
        cy.get('.swal2-confirm').click();

        // User must be returned to the dashboard or tasklist
        cy.get('#root').should('be.visible');
    });
});