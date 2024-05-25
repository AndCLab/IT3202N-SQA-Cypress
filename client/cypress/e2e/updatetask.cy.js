import React from 'react';
import { mount } from 'cypress/react18';
import AddTaskForm from '../../src/components/AddTaskForm';
import Tasklist from '../../src/components/Tasklist';
import EditTaskModal from '../../src/components/EditTaskModal';

describe('update task form', () => {
    beforeEach(() => {
        // Visit the page
        cy.visit('http://localhost:5173/login');
    
        // Log in using a tester account
        cy.get("#username").type('tester');
        cy.get("#password").type('1qaz2wsx');
        cy.get('[type="submit"]').click();
    });

    // TST_No_04_01
    it('should show Edit Task form modal', () => {
        // Make sure that there is a task that can be edited, create a sample task
        // Create a test task with a valid title and description
        cy.get('[data-cy=title-input]').type('Test Task Title');
        cy.get('[data-cy=description-input]').type('Test Task Description');
        cy.get('[data-cy=add-button]').click();
        cy.get('[data-cy="task-list"]').contains('Test Task Title').should('exist');
        cy.get('[data-cy="task-list"]').contains('Test Task Description').should('exist');
        
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // A form modal should be visible  
        cy.get('#my_modal_2').should('be.visible');

        // 'Title' input field must be visible
        cy.get('[data-cy=edit-title]').should('be.visible');

        // 'Description' input field must be visible 
        cy.get('[data-cy=edit-description]').should('be.visible');

        // 'Edit' button must be visible
        cy.get('[data-cy=edit-button]').should('be.visible');

        // 'Close' button must be visible
        cy.get('[data-cy=close-button]').should('be.visible');
    });

    // TST_No_04_02
    it('should close the Edit Task form modal', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // A form modal should be visible  
        cy.get('#my_modal_2').should('be.visible');

        // Click the close button and return to dashboard
        cy.get('[data-cy=close-button]').click({ force: true });
    });

    // TST_No_04_03
    it('should change the task "Title" and "Description"', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // Clear the value of the title input field and type a new task title
        cy.get('[data-cy=edit-title]').clear();
        cy.get('[data-cy=edit-title]').type('New Task Title');

        // Clear the value of the description input field and type a new task description
        cy.get('[data-cy=edit-description]').clear();
        cy.get('[data-cy=edit-description]').type('New Task Description');

        // Click the edit button to save changes and return to dashboard
        cy.get('[data-cy=edit-button]').click({ force: true });

        // Verify if the task title and description has been updated
        cy.get('[data-cy="task-list"]').contains('New Task Title').should('exist');
        cy.get('[data-cy="task-list"]').contains('New Task Description').should('exist');
    });

    // TST_No_04_04
    it('should show error message when all fields are empty', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // Clear the value of the title input field
        cy.get('[data-cy=edit-title]').clear();

        // Clear the value of the description input field
        cy.get('[data-cy=edit-description]').clear();

        // Click the edit button to save changes and return to dashboard
        cy.get('[data-cy=edit-button]').click({ force: true });

        // An error message must be visible in the title input field
        cy.get('[data-cy=edit-title]').then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.");
          });
    });

    // TST_No_04_05
    it('should show error message when "Title" field is empty', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // Clear the value of the title input field
        cy.get('[data-cy=edit-title]').clear();

        // Clear the value of the description input field and type a new description
        cy.get('[data-cy=edit-description]').clear();
        cy.get('[data-cy=edit-description]').type('Testing the error message pop up');

        // Click the edit button to save changes and return to dashboard
        cy.get('[data-cy=edit-button]').click({ force: true });

        // An error message must be visible in the title input field
        cy.get('[data-cy=edit-title]').then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.");
          });
    });

    // TST_No_04_06
    it('should show error message when "Description" field is empty', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // Clear the value of the title input field and type a new title 
        cy.get('[data-cy=edit-title]').clear();
        cy.get('[data-cy=edit-title]').type('Update Task Function Testing');

        // Clear the value of the description input field
        cy.get('[data-cy=edit-description]').clear();

        // Click the edit button to save changes and return to dashboard
        cy.get('[data-cy=edit-button]').click({ force: true });

        // An error message must be visible in the title input field
        cy.get('[data-cy=edit-description]').then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.");
          });
    });

    // TST_No_04_07
    it('should show error message when "Title" field is the same', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // Clear the value of the description input field and type a new description
        cy.get('[data-cy=edit-description]').clear();
        cy.get('[data-cy=edit-description]').type('Update Task Function Testing');

        // Click the edit button to save changes and return to dashboard
        cy.get('[data-cy=edit-button]').click({ force: true });

        // Check if the SweetAlert error message is displayed
        cy.get('.swal2-container').should('be.visible');
        cy.get('.swal2-title').should('have.text', 'Error Updating Task');
        cy.get('.swal2-html-container').should('have.text', 'Title Already Exists');
  
        // Close the SweetAlert modal
        cy.get('button.swal2-confirm').click({force: true});
  
        // Check the SweetAlert modal if it is closed
        cy.get('.swal2-container').should('not.exist');
    });

    // TST_No_04_08
    it('should change the task "Title" even if "Description" is the same', () => {
        // Click 'Edit' icon of the first task item 
        cy.get('[data-cy="task-list"] li').first().within(() => {
            cy.get('svg.cursor-pointer.hover\\:text-yellow-400').click({ force: true });
        });

        // Clear the value of the title input field and type a new title
        cy.get('[data-cy=edit-title]').clear();
        cy.get('[data-cy=edit-title]').type('New Test Task');

        // Click the edit button to save changes and return to dashboard
        cy.get('[data-cy=edit-button]').click({ force: true });

        // Verify if the task has been updated
        cy.get('[data-cy="task-list"]').contains('New Test Task').should('exist');
    });
});