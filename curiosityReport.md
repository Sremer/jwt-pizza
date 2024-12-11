# Curiosity Report
## Docker

I was very curious about Docker and how it works. It is such a cool concept to me that seems like it has revolutionized the software space. 
I took some time to learn about it and I'm glad I did!

### What is Docker?
I learned that Docker is an open-source platform that allows you to package all of your application and dependencies into a "container"
that makes it super easy to run on any platform that is running docker. The idea comes from the idea of shipping containers
because of how they standardize the shipping process. 

### Why use Docker?
Docker seems extremely useful and I understand why it has changed so much. Being able to package code and run it super
fast and easy in so many places makes maintaining infrastructure and code so much easier. By being able to specify the
resources that a container is allowed to use is amazing because it helps keep it seperate from everything else on the machine
the container is being run on. That protects the machine from having any one application take too many resources. 
A big motivation for using containers was a shift from a monolithic
architecture to a microservices architecture. Having microservices allows for a team to be able to update different components
of the service without having to update the entire service. Containers are a great way to package, update, and deploy these microservices.

### Container vs Virtual Machine
Virtual machines are basically when you start up a whole new operating system on your machine. There are many benefits to this, but 
if you are just needing it to run a single application, it is a lot of overhead. Containers are a lot lighter weight than virtual machines
They are quick to start up, whereas virtual machines can take a while to start up. Containers are also more efficient with resources. Without
having to start up an entire operating system every time, containers make better use of the resources on the machine. The container
engine sits right on top of the operating system of the machine it's running on. As long as the operating system can run the container engine, 
the containers can run on any operating system.

### Open source project vs company
Docker is an open-source project, but there is also a company based around Docker. The company is called Docker Inc. The open-source projects
based on Docker include projects for building, running, and managing containers. Docker Inc. creates products that make
these open-source projects easier to use and manage. A developer could take the time to learn how to use all the open-source
projects and manage all the resources by themselves, but it may just be more time efficient to use the products that Docker Inc. has created.
This is good for Docker Inc. because many people will use their product because it is free at first and then when they decide
it would just be better to pay, Docker Inc. is ready to help them out.

### Security issues
Security can be a big concern with containers. If there are fraudulent containers that are run, they could execute potentially
harmful code. If there is a security problem in a base image that many images are built on, that could be a big problem. It is important
to stay vigilant.

### Where to run docker?
Docker can be run on many different platforms. One of the most popular right now is running them on a cloud provider. By running 
on a platform like AWS or Azure, you can easily scale your containers up and down as needed. This makes having an elastic application
so much easier. By spinning up a new container when traffic is high and spinning it down when traffic is low, you can save a lot of money. 
It also makes updating your application easier. You can replace specific containers very easily. 

### Conclusion
Docker is such a cool concept and I have had the opportunity to use it or software like it in this class and an internship I've had.
Learning about it more has made it a lot more clear and will help me in the future. I can't wait to use docker to create amazing
applications that can scale and be updated easily. I'm glad I took the time to look into it!