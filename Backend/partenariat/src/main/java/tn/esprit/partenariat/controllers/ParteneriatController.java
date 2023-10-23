    package tn.esprit.partenariat.controllers;

    import lombok.extern.slf4j.Slf4j;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.format.annotation.DateTimeFormat;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import tn.esprit.partenariat.entities.Parteneriat;
    import tn.esprit.partenariat.repositories.ParteneriatRepository;
    import tn.esprit.partenariat.services.ParteneriatNotFoundException;
    import tn.esprit.partenariat.services.ParteneriatServiceInterface;

    import java.time.LocalDateTime;
    import java.util.List;

    @Slf4j
    @RestController
    @RequestMapping("/Parteneriat")
    public class ParteneriatController {

        @Autowired
        ParteneriatServiceInterface psI;

        @Autowired
        ParteneriatRepository pr;


        @GetMapping("/getAllParteneriat")
        public List<Parteneriat> getAllParteneriat() {
            return psI.getAllParteneriat();
        }

        @GetMapping("/getParteneriatById/{id}")
        public ResponseEntity<Parteneriat> getParteneriatById(@PathVariable Long id) {
            Parteneriat parteneriat = psI.getParteneriatById(id).orElse(null);
            if (parteneriat != null) {
                return new ResponseEntity<>(parteneriat, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PostMapping("/createParteneriat")
        public ResponseEntity<Parteneriat> createParteneriat(@RequestBody Parteneriat parteneriat) {
            Parteneriat createdParteneriat = psI.createParteneriat(parteneriat);
            return new ResponseEntity<>(createdParteneriat, HttpStatus.CREATED);
        }

        @PutMapping("/updateParteneriat/{idParteneriat}")
        public ResponseEntity<Parteneriat> updateParteneriat(@PathVariable Long idParteneriat, @RequestBody Parteneriat p) {
            try {
                Parteneriat updatedParteneriat = psI.updateParteneriat(idParteneriat, p);
                return new ResponseEntity<>(updatedParteneriat, HttpStatus.OK);
            } catch (ParteneriatNotFoundException ex) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("/deleteParteneriat/{id}")
        public void deleteParteneriat(@PathVariable Long id) {
            psI.deleteParteneriat(id);
        }


        @GetMapping("/verify/{id}")
        public ResponseEntity<Parteneriat> verifyParteneriat(@PathVariable Long id) {
            Parteneriat verifiedParteneriat = psI.verifyParteneriat(id);

            if (verifiedParteneriat != null) {
                return ResponseEntity.ok(verifiedParteneriat);
            } else {
                return ResponseEntity.notFound().build();
            }
        }


        @GetMapping("/cancelParteneriat/{id}")
        public ResponseEntity<Parteneriat> cancelParteneriat(@PathVariable Long id) {
            Parteneriat canceledParteneriat = psI.cancelParteneriat(id);

            if (canceledParteneriat != null) {
                return ResponseEntity.ok(canceledParteneriat);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        @PutMapping("/assign-event/{id}/{eventId}")
        public ResponseEntity<String> assignEventToParteneriat(
                @PathVariable Long id,
                @PathVariable Long eventId) {
            try {
                Parteneriat p = psI.getParteneriatById(id).orElse(null);
                assert p != null;
                p.setEventId(eventId);

                pr.save(p);

                return ResponseEntity.ok("Event ID assigned to Parteneriat successfully.");
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error assigning event ID to Parteneriat: " + e.getMessage());
            }
        }
    }
