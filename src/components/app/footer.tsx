export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 px-4 md:px-6 mt-8 border-t">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} PetNameAI. Developed by www.eliudwaititu.online. All rights reserved.</p>
      </div>
    </footer>
  );
}
