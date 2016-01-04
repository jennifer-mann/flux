describe("Flux Chat [000]", function(){

  beforeEach(function(){
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // http://on.cypress.io/visit
    cy.visit("http://localhost:8080")
  })

  context("When page is initially opened [001]", function(){
    it("should show heading [001]", function(){
      cy.get(".message-thread-heading").should("exist")
    })
  })

  context("New Chat [005]", function(){
    beforeEach(function(){
      cy
        .get(".message-composer").type("Hello World!")
    })

    it("should remove chat from composer on enter [006]", function(){
      cy
        .get(".message-composer").should("have.value", "Hello World!")
        .get(".message-composer").type("{enter}")
        .get(".message-composer").should("not.have.value", "Hello World!")
    })

    it("should add chat text to chat list [002]", function(){
      cy
        .get(".message-composer").type("{enter}")
        .get(".message-list").find("li").should("have.length", 3)
        .get(".message-text").contains("Hello World!")
    })

    it("new chat in list should display typed text [004]", function(){
      cy
        .get(".message-composer").type("{enter}")
        .get(".message-text").contains("Hello World!")
    })

    it.only("should display time now beside new chat [003]", function(){
      var todaysDate = cy.moment().format("h:mm:ss A")

      cy
        .get(".message-composer").type("{enter}")
        .get(".message-time").contains(todaysDate)
    })

    it("should display new chat as coming from 'Bill' [003]", function(){
      cy
        .get(".message-composer").type("{enter}")
        .get(".message-list").find("li").last().contains("Bill")

    })
  })

  context("Focus on other chat thread [005]", function(){
    beforeEach(function(){
      cy
        .get(".thread-list").find("li").first().click()
    })

    it("should display newly clicked thread as active [006]", function(){
      cy
        .get(".thread-list").find("li").first()
          .should("have.class", "active")
    })

    it("should not display other threads as active [006]", function(){
      cy
        .get(".thread-list").find("li").not(":first")
          .should("not.have.class", "active")
    })

    it("updates header to new chat thread [007]", function(){
      cy
        .get(".message-thread-heading").contains("Jing and Bill")
    })

    it("decrements unread threads count [008]", function(){
      cy
        .get(".thread-count").contains("1")
    })

  })

})