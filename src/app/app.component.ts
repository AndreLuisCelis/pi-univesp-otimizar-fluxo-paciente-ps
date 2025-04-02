import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { I18n } from '@aws-amplify/core';
import { AmplifyAuthenticatorModule, AuthenticatorComponent, AuthenticatorService } from '@aws-amplify/ui-angular';
import { translations } from '@aws-amplify/ui-angular';

I18n.setLanguage('pt'); // Define o idioma para português

Amplify.configure(outputs);

// Tradução personalizada
translations['pt'] = {
  'Sign In': 'Login',
  'Create Account': 'Criar Conta',
  // Adicione outras traduções conforme necessário
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Adicione esta linha
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'amplify-angular-template';

  @ViewChildren('amplify-authenticator')
  amplifyAuthenticator!: AuthenticatorComponent; // Replace with 'any' or the correct type if known

    
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }
  ngOnInit(): void {
    console.log('AppComponent initialized');
  }

  ngAfterViewInit(): void {
   
    setTimeout(() => {
      if (this.amplifyAuthenticator) {
        // Atualiza os títulos dos botões
        const btnLogar = document.getElementsByTagName('button')[0];
        btnLogar.innerText = 'Logar';

        const btnCriarConta = document.getElementsByTagName('button')[1];
        btnCriarConta.innerText = 'Criar Conta';

        document.getElementsByTagName('button')[3].innerText = 'Entrar';  
        document.getElementsByTagName('button')[4].innerText = 'Esqueci minha senha';  
        
        btnLogar.onclick = () => {      
          document.getElementsByTagName('button')[3].innerText = 'Entrar';  
          document.getElementsByTagName('button')[4].innerText = 'Esqueci minha senha';      
        }
        btnCriarConta.onclick = () => {      
          document.getElementsByTagName('button')[4].innerText = 'Criar Conta';  
        } 
      } 
    }, 500);
  }
}
