package tn.esprit.partenariat.entities;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "parteneriat")
public class Parteneriat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idParteneriat", nullable = false)
    private Long idParteneriat;

    @Column(name = "nom_parteneriat")
    private String nomParteneriat;

    @Column(name = "numero_telephone")
    private Long numeroTelephone;

    @Column(name = "email")
    private String email;

    @Column(name = "budget")
    private Long budget;

    @Column(name = "description")
    private String description;

}